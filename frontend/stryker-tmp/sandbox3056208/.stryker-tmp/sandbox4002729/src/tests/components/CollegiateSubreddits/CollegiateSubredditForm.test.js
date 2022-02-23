// @ts-nocheck
import { render, waitFor, fireEvent } from "@testing-library/react";
import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { collegiateSubredditsFixtures } from "fixtures/collegiateSubredditsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("CollegiateSubredditForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Name/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a CollegiateSubreddit ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <CollegiateSubredditForm initialCollegiateSubreddit={collegiateSubredditsFixtures.oneCollegiateSubreddit} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/CollegiateSubredditForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/CollegiateSubredditForm-id/)).toHaveValue("1");
    });

/* Won't get used since no specific format

    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubredditForm-name")).toBeInTheDocument());
        const nameField = getByTestId("CollegiateSubredditForm-name");
        const locationField = getByTestId("CollegiateSubredditForm-location");
        const submitButton = getByTestId("CollegiateSubredditForm-submit");

        fireEvent.change(nameField, { target: { value: 'bad-input' } });
        fireEvent.change(locationField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Name must be in the format/)).toBeInTheDocument());
        expect(getByText(/Location must be in ISO format/)).toBeInTheDocument();
    });
*/
    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubredditForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("CollegiateSubredditForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Name is required./)).toBeInTheDocument());
        expect(getByText(/Location is required./)).toBeInTheDocument();
        expect(getByText(/Subreddit is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <CollegiateSubredditForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubredditForm-name")).toBeInTheDocument());

        const nameField = getByTestId("CollegiateSubredditForm-name");
        const locationField = getByTestId("CollegiateSubredditForm-location");
        const subredditField = getByTestId("CollegiateSubredditForm-subreddit");
        const submitButton = getByTestId("CollegiateSubredditForm-submit");

        fireEvent.change(nameField, { target: { value: 'University of California, Santa Barbara' } });
        fireEvent.change(locationField, { target: { value: 'Santa Barbara' } });
        fireEvent.change(subredditField, { target: { value: 'UCSB' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <CollegiateSubredditForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("CollegiateSubredditForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("CollegiateSubredditForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


