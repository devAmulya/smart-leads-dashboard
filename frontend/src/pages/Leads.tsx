import { useEffect, useState } from "react";

import api from "../api/axios";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}

function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const fetchLeads = async () => {
    try {
      const res = await api.get(
        `/leads?search=${search}&status=${status}&page=${page}&limit=5`
      );

      setLeads(res.data.leads);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status, page]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold">
            Leads Dashboard
          </h1>

          <button className="bg-linear-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition">
            + Add Lead
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            >
              <option value="">
                All Status
              </option>

              <option value="new">
                New
              </option>

              <option value="contacted">
                Contacted
              </option>

              <option value="qualified">
                Qualified
              </option>

              <option value="lost">
                Lost
              </option>
            </select>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="text-left p-5">
                  Name
                </th>

                <th className="text-left p-5">
                  Email
                </th>

                <th className="text-left p-5">
                  Status
                </th>

                <th className="text-left p-5">
                  Source
                </th>

                <th className="text-left p-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-5">
                    {lead.name}
                  </td>

                  <td className="p-5">
                    {lead.email}
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
                      {lead.status}
                    </span>
                  </td>

                  <td className="p-5">
                    {lead.source}
                  </td>

                  <td className="p-5 flex gap-3">
                    <button className="bg-yellow-500 px-4 py-2 rounded-xl">
                      Edit
                    </button>

                    <button className="bg-red-500 px-4 py-2 rounded-xl">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="bg-white/10 px-5 py-3 rounded-xl"
          >
            Prev
          </button>

          <span className="flex items-center">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className="bg-white/10 px-5 py-3 rounded-xl"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leads;