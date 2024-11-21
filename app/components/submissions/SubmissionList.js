const SubmissionList = ({ submissions, updateStatus }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Layanan
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deskripsi
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="px-6 py-4 border-t border-gray-200">
                {submission.name}
              </td>
              <td className="px-6 py-4 border-t border-gray-200">
                {submission.description}
              </td>
              <td className="px-6 py-4 border-t border-gray-200">
                {submission.status}
              </td>
              <td className="px-6 py-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button
                    onClick={() => updateStatus(submission.id, "Approved")}
                    className="text-green-600 hover:text-green-800"
                  >
                    Setujui
                  </button>
                  <button
                    onClick={() => updateStatus(submission.id, "Rejected")}
                    className="text-red-600 hover:text-red-800"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() =>
                      updateStatus(submission.id, "Revision Needed")
                    }
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    Revisi
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SubmissionList;
