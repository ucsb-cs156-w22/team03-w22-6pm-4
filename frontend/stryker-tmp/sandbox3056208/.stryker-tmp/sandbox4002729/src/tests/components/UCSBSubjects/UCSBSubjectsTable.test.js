// @ts-nocheck
import { fireEvent, render, waitFor } from "@testing-library/react";
import { ucsbSubjectsFixtures } from "fixtures/ucsbSubjectsFixtures";
import UCSBSubjectsTable from "main/components/UCSBSubjects/UCSBSubjectsTable"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UserTable tests", () => {
  const queryClient = new QueryClient();


  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBSubjectsTable subjects={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });
  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBSubjectsTable subjects={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBSubjectsTable subjects={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBSubjectsTable subjects={ucsbSubjectsFixtures.threeSubjects} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "Subject Code", "Subject Translation", "College Code", "Department Code", 
                             "Related Department Code", "Inactive"];
    const expectedFields = ["id", "subjectCode", "subjectTranslation", "collegeCode", "deptCode", "relatedDeptCode", "inactive"];
    const testId = "UCSBSubjectsTable";

    expectedHeaders.forEach((headerText) => {
      const header = getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");

    const editButton = getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("Edit button navigates to the edit page for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UCSBSubjectsTable subjects={ucsbSubjectsFixtures.threeSubjects} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(getByTestId(`UCSBSubjectsTable-cell-row-0-col-id`)).toHaveTextContent("1"); });

    const editButton = getByTestId(`UCSBSubjectsTable-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    
    const deleteButton = getByTestId(`UCSBSubjectsTable-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(editButton);
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/UCSBSubjects/edit/1'));

  });

});

