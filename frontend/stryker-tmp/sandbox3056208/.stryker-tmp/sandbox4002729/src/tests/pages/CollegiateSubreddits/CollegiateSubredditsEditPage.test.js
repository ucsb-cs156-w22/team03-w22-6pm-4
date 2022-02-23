// @ts-nocheck
import { fireEvent, queryByTestId, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import CollegiateSubredditsEditPage from "main/pages/CollegiateSubreddits/CollegiateSubredditsEditPage";

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
        useParams: () => ({
            id: 17
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("CollegiateSubredditsEditPage tests", () => {

    describe("when the backend doesn't return a todo", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/collegiateSubreddits", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {
            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <CollegiateSubredditsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit collegiateSubreddit")).toBeInTheDocument());
            expect(queryByTestId("collegiateSubredditForm-name")).not.toBeInTheDocument();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/collegiateSubreddits", { params: { id: 17 } }).reply(200, {
                id: 17,
                name: "a",
                location: "b",
                subreddit: "c",
            });
            axiosMock.onPut('/api/collegiateSubreddits').reply(200, {
                id: 17,
                name: "a",
                location: "b",
                subreddit: "c",
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <CollegiateSubredditsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <CollegiateSubredditsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("collegiateSubredditForm-name")).toBeInTheDocument());

            const idField = getByTestId("collegiateSubredditForm-id");
            const nameField = getByTestId("collegiateSubredditForm-name");
            const locationField = getByTestId("collegiateSubredditForm-location");
            const subredditField = getByTestId("collegiateSubredditForm-subreddit");
            const submitButton = getByTestId("collegiateSubredditForm-submit");

            expect(idField).toHaveValue("17");
            expect(nameField).toHaveValue("a");
            expect(locationField).toHaveValue("b");
            expect(subredditField).toHaveValue("c");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <CollegiateSubredditsEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("collegiateSubredditForm-name")).toBeInTheDocument());

            const idField = getByTestId("collegiateSubredditForm-id");
            const nameField = getByTestId("collegiateSubredditForm-name");
            const locationField = getByTestId("collegiateSubredditForm-location");
            const subredditField = getByTestId("collegiateSubredditForm-subreddit");
            const submitButton = getByTestId("collegiateSubredditForm-submit");

            expect(idField).toHaveValue("17");
            expect(nameField).toHaveValue("a");
            expect(locationField).toHaveValue("b");
            expect(subredditField).toHaveValue("c");

            expect(submitButton).toBeInTheDocument();

            fireEvent.change(nameField, { target: { value: 'd' } });
            fireEvent.change(locationField, { target: { value: 'e' } });
            fireEvent.change(subredditField, { target: { value: 'f' } });

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("collegiateSubreddit Updated - id: 17 name: d");
            expect(mockNavigate).toBeCalledWith({ "to": "/collegiateSubreddits/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                name: 'd',
                location: "e",
                subreddit: "f"
            })); // posted object

        });

       
    });
});


