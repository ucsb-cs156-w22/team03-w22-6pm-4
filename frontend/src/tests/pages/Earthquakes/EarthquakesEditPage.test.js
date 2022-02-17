import { fireEvent, queryByTestId, render, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import EarthquakesEditPage from "main/pages/Earthquakes/EarthquakesEditPage";

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

describe("EarthquakesEditPage tests", () => {

    describe("when the backend doesn't return an earthquake", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/earthquakes", { params: { id: 17 } }).timeout();
        });

        const queryClient = new QueryClient();
        test("renders header but table is not present", async () => {
            const {getByText, queryByTestId} = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <EarthquakesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
            await waitFor(() => expect(getByText("Edit Earthquake")).toBeInTheDocument());
            expect(queryByTestId("EarthquakeForm-title")).not.toBeInTheDocument();
        });
    });

    describe("tests where backend is working normally", () => {

        const axiosMock = new AxiosMockAdapter(axios);

        beforeEach(() => {
            axiosMock.reset();
            axiosMock.resetHistory();
            axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
            axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
            axiosMock.onGet("/api/earthquakes", { params: { id: 17 } }).reply(200, {
                id: '17',
                title: 'a',
                mag: '1.0',
                place: 'b',
                time: 0
            });
            axiosMock.onPut('/api/earthquakes').reply(200, {
                id: '17',
                title: 'a',
                mag: '1.0',
                place: 'b',
                time: "0"
            });
        });

        const queryClient = new QueryClient();
        test("renders without crashing", () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <EarthquakesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );
        });

        test("Is populated with the data provided", async () => {

            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <EarthquakesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("EarthquakeForm-title")).toBeInTheDocument());

            const idField = getByTestId("EarthquakeForm-id");
            const titleField = getByTestId("EarthquakeForm-title");
            const magField = getByTestId("EarthquakeForm-mag");
            const placeField = getByTestId("EarthquakeForm-place");
            const timeField = getByTestId("EarthquakeForm-time");
            const submitButton = getByTestId("EarthquakeForm-submit");

            expect(idField).toHaveValue("17");
            expect(titleField).toHaveValue("a");
            expect(magField).toHaveValue("1.0");
            expect(placeField).toHaveValue("b");
            expect(timeField).toHaveValue("0");
        });

        test("Changes when you click Update", async () => {



            const { getByTestId } = render(
                <QueryClientProvider client={queryClient}>
                    <MemoryRouter>
                        <EarthquakesEditPage />
                    </MemoryRouter>
                </QueryClientProvider>
            );

            await waitFor(() => expect(getByTestId("EarthquakeForm-title")).toBeInTheDocument());

            const idField = getByTestId("EarthquakeForm-id");
            const titleField = getByTestId("EarthquakeForm-title");
            const magField = getByTestId("EarthquakeForm-mag");
            const placeField = getByTestId("EarthquakeForm-place");
            const timeField = getByTestId("EarthquakeForm-time");
            const submitButton = getByTestId("EarthquakeForm-submit");

            expect(idField).toHaveValue("17");
            expect(titleField).toHaveValue("a");
            expect(magField).toHaveValue("1.0");
            expect(placeField).toHaveValue("b");
            expect(timeField).toHaveValue("0");
            await waitFor(() => expect(getByTestId("EarthquakeForm-quarterYYYYQ")).toBeInTheDocument());


            expect(submitButton).toBeInTheDocument();

            fireEvent.change(titleField, { target: { value: 'c' } });
            fireEvent.change(magField, { target: { value: '10.0' } });
            fireEvent.change(placeField, { target: { value: 'd' } });
            fireEvent.change(timeField, { target: { value: '1' } });

            fireEvent.click(submitButton);

            await waitFor(() => expect(mockToast).toBeCalled);
            expect(mockToast).toBeCalledWith("Earthquake Updated - id: 17 title: c");
            expect(mockNavigate).toBeCalledWith({ "to": "/earthquakes/list" });

            expect(axiosMock.history.put.length).toBe(1); // times called
            expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
            expect(axiosMock.history.put[0].data).toBe(JSON.stringify({
                title: 'c',
                mag: '10.0',
                place: 'd',
                time: "1"
            })); // posted object

        });

       
    });
});


