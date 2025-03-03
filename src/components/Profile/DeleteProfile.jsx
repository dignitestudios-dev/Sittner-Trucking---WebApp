import React, { useContext } from "react";
import { MyContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { db, deleteDoc, deleteObject, doc, ref, storage } from "../../firbase/FirebaseInit";

export default function DeleteEmpProfile() {  
    const { DeleteProfile, setIsDeleteProfile, DeleteEmpId,DeleteDocId} = useContext(MyContext);
    const DeleteEmp = async () => {
        console.log(DeleteDocId,DeleteEmpId,"empppsss");
        
        await deleteDoc(doc(db, "employee", DeleteDocId));  
        const desertRef = ref(storage,"member/"+DeleteEmpId);
        deleteObject(desertRef).then(() => {
          toast("Deleted");
          setIsDeleteProfile(false);
        }).catch((error) => {
          toast(error.message);
          setIsDeleteProfile(false);
        });
      } 

  return (
    <>
      {DeleteProfile ? (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[350px]  my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6  flex flex-col items-center">
                  <img src="/danger.png" className="mb-3" width={50} alt="" />
                  <h3 className="font-semibold text-[20px] leading-[29px] mb-3 capitalize">
                    Delete Employee
                  </h3>
                  <p className="text-[#565656] text-[13px] text-center font-medium leading-[20px] ">
                    Are you sure you want to <br /> delete this employee?
                  </p>
                  <div className="flex items-center w-full mt-2 justify-between">
                    <button
                      className={`flex text-xs w-[140px] text-center bg-[#ECECEC] h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
                      onClick={() => setIsDeleteProfile(false)}
                    >
                      No, Keep It
                    </button>
                    <button
                      className={`flex text-xs w-[140px] text-white text-center bg-[#EE3131] h-[44px] flex items-center justify-center rounded-[8px] font-semibold mt-3 px-4 py-2   `}
                      onClick={() =>DeleteEmp()}
                    >
                      Yes, Delete Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
