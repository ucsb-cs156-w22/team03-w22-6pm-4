import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UCSBSubjectsForm from "main/components/UCSBSubjects/UCSBSubjectsForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";


export default function UCSBSubjectsCreatePage() {
  const objectToAxiosParams = (ucsbSubjects) => ({
    url: "/api/UCSBSubjects/post",
    method: "POST",
    params: {
      subjectCode: ucsbSubjects.subjectCode,
      subjectTranslation: ucsbSubjects.subjectTranslation,
      collegeCode: ucsbSubjects.collegeCode,
      deptCode: ucsbSubjects.deptCode,
      relatedDeptCode: ucsbSubjects.relatedDeptCode,
      inactive: ucsbSubjects.inactive
    }
  });

  const onSuccess = (ucsbSubjects) => {

    toast(`New UCSBSubjects Created - id: ${ucsbSubjects.id} subjectCode: ${ucsbSubjects.subjectCode}`);

  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/UCSBSubjects/all"]
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
          <h1>Create New UCSBSubject</h1>

          <UCSBSubjectsForm submitAction={onSubmit} />

        </div>
      </BasicLayout>
    )
  }