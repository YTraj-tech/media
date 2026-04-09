// 'use client'

// import { useAdminhook } from "@/context/AdminContext"
// import Link from "next/link"


// const AdminPage = () => {

//   const { loading, pendingTask } = useAdminhook()

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl mb-4">Admin Dashboard</h1>

//       {loading && <p>Loading...</p>}

//       {!loading && pendingTask?.length === 0 && (
//         <p className="text-gray-500">No pending tasks</p>
//       )}

//       {!loading && pendingTask && pendingTask.length > 0 && (
//         <table className="border border-gray-400 w-full text-center">

//           <thead className="bg-gray-200">
//             <tr>
//               <th className="border p-2">Task ID</th>
//               <th className="border p-2">Vehicle</th>
//               <th className="border p-2">Start Date</th>
//               <th className="border p-2">Workers</th>
//               <th className="border p-2">Status</th>
//               <th className="boredr p-2" >More Info</th>
//             </tr>
//           </thead>

//           <tbody>
//             {pendingTask?.map((task) => (

//               <tr key={task._id}>
//                 <td className="border p-2">{task._id}</td>

//                 <td className="border p-2">
//                   {task.vehicalType}
//                 </td>

//                 <td className="border p-2">
//                   {new Date(task.startDate).toLocaleDateString()}
//                 </td>


//                 <td className="border p-2">
//                   {task.numberOfWorker}
//                 </td>

//                 <td className="border p-2">
//                   {task.iscompleted}
//                 </td>



//                 <td>
//                   <Link href={`/Admin/Task/${task._id}`}>
//                       More Info -
//                   </Link>
//                 </td>
//               </tr>

//             ))}
//           </tbody>

//         </table>
//       )}
//     </div>
//   )

// }


// export default AdminPage




'use client'
import Link from "next/link"
import { useAdminhook } from "@/context/AdminContext"


const AdminPage = () => {
  const { loading, pendingTask } = useAdminhook()


  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      {pendingTask && pendingTask.length > 0 && (
        <div className="overflow-x-auto">
          <table className="border border-gray-400 w-full text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Task ID</th>
                <th className="border p-2">Vehicle</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">Workers Needed</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">More Info</th>
              </tr>
            </thead>
            <tbody>
              {pendingTask && pendingTask.map((task) => (
                <tr key={task._id.toString()}>
                  <td className="border p-2">
                    {task._id.toString().slice(-8)}
                  </td>
                  <td className="border p-2">
                    {task.vehicalType}
                  </td>
                  <td className="border p-2">
                    {new Date(task.startDate).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {task.numberOfWorker}
                  </td>
                  <td className="border p-2">
                    <span className={`px-2 py-1 rounded text-sm ${task.iscompleted === "YES"
                      ? "bg-green-100 text-green-800"
                      : task.iscompleted === "TRACKING"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                      }`}>
                      {task.iscompleted}
                    </span>
                  </td>
                  <td className="border p-2">
                    <Link
                      href={`/Admin/Task/${task._id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminPage
