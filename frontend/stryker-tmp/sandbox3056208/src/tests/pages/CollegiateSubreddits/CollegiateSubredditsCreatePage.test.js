// @ts-nocheck
import { render, waitFor, fireEvent } from "@testing-library/react";
import CollegiateSubredditsCreatePage from "main/pages/CollegiateSubreddits/CollegiateSubredditsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("CollegiateSubredditsCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CollegiateSubredditsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const subreddit = {
            id: 17,
            name: "a",
            location: "b",
            subreddit: "c",
        };

        axiosMock.onPost("/api/collegiateSubreddits/post").reply( 202, subreddit );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <CollegiateSubredditsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("collegiateSubredditForm-name")).toBeInTheDocument();
        });

        const nameField = getByTestId("collegiateSubredditForm-name");
        const locationField = getByTestId("collegiateSubredditForm-location");
        const subredditField = getByTestId("collegiateSubredditForm-subreddit");
        const submitButton = getByTestId("collegiateSubredditForm-submit");

        fireEvent.change(nameField, { target: { value: 'a' } });
        fireEvent.change(locationField, { target: { value: 'b' } });
        fireEvent.change(subredditField, { target: { value: 'c' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "name": "a",
            "location": "b",
            "subreddit": "c"
        });

        expect(mockToast).toBeCalledWith("New subreddit Created - id: 17 name: a");
        expect(mockNavigate).toBeCalledWith({ "to": "/collegiateSubreddits/list" });
    });


});


