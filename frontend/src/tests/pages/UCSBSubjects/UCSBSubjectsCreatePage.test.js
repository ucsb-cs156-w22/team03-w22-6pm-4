import { render, waitFor, fireEvent } from "@testing-library/react";
import UCSBSubjectsCreatePage from "main/pages/UCSBSubjects/UCSBSubjectsCreatePage";
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

describe("UCSBSubjectsCreatePage tests", () => {

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
                    <UCSBSubjectsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const ucsbSubjects = {
            id: 17,
            subjectCode: "GPS",
            subjectTranslation:"Global Peace and Security",
            collegeCode: "UCSB",
            deptCode: "GPS" ,
            relatedDeptCode: "GPS",
            inactive: false
        };

        axiosMock.onPost("/api/UCSBSubjects/post").reply( 202, ucsbSubjects );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBSubjectsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("UCSBSubjectForm-subjectCode")).toBeInTheDocument();
        });

        const subjectCodeField = getByTestId("UCSBSubjectForm-subjectCode");
        const subjectTranslationField = getByTestId("UCSBSubjectForm-subjectTranslation");
        const collegeCodeField = getByTestId("UCSBSubjectForm-collegeCode");
        const deptCodeField = getByTestId("UCSBSubjectForm-deptCode");
        const relatedDeptCodeField = getByTestId("UCSBSubjectForm-relatedDeptCode");
        const inactiveField = getByTestId("UCSBSubjectForm-inactive");
        const submitButton = getByTestId("UCSBSubjectForm-submit");

        fireEvent.change(subjectCodeField, { target: { value: 'GPS' } });
        fireEvent.change(subjectTranslationField, { target: { value: 'Global Peace and Security' } });
        fireEvent.change(collegeCodeField, { target: { value: 'UCSB' } });
        fireEvent.change(deptCodeField, { target: { value: 'GPS' } });
        fireEvent.change(relatedDeptCodeField, { target: { value: 'GPS' } });
        fireEvent.change(inactiveField, { target: { value: false } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "subjectCode": "GPS",
            "subjectTranslation": "Global Peace and Security",
            "collegeCode": "UCSB",
            "deptCode": "GPS",
            "relatedDeptCode": "GPS",
            "inactive":"false"
        });

        expect(mockToast).toBeCalledWith("New UCSBSubjects Created - id: 17 subjectCode: GPS");
        expect(mockNavigate).toBeCalledWith({ "to": "/UCSBSubjects/list" });
    });


});


