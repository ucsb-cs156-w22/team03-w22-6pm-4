import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import UCSBSubjectsForm from "main/components/UCSBSubjects/UCSBSubjectsForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function UCSBSubjectsEditPage() {
  let { id } = useParams();

  const { data: ucsbSubjects, error: error, status: status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/UCSBSubjects?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/UCSBSubjects`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (ucsbSubjects) => ({
    url: "/api/UCSBSubjects",
    method: "PUT",
    params: {
      id: ucsbSubjects.id,
    },
    data: {

      subjectCode: ucsbSubjects.subjectCode,
      subjectTranslation: ucsbSubjects.subjectTranslation,
      collegeCode: ucsbSubjects.collegeCode,
      deptCode: ucsbSubjects.deptCode,
      relatedDeptCode: ucsbSubjects.relatedDeptCode,
      inactive: ucsbSubjects.inactive
    }
  });

  const onSuccess = (ucsbSubjects) => {
    toast(`UCSBSubjects Updated - id: ${ucsbSubjects.id} subjectCode: ${ucsbSubjects.subjectCode}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/UCSBSubjects?id=${id}`]
  );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/UCSBSubjects/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit UCSBSubjects</h1>
        {ucsbSubjects &&
          <UCSBSubjectsForm initialUCSBSubject={ucsbSubjects} submitAction={onSubmit} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

