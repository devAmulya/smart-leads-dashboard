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

  const [showModal, setShowModal] = useState(false);

  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    status: "new",
    source: "website",
  });

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

  const createLead = async () => {
    try {
      await api.post("/leads", leadData);

      setShowModal(false);

      setLeadData({
        name: "",
        email: "",
        status: "new",
        source: "website",
      });

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await api.delete(`/leads/${id}`);

      fetchLeads();
    } catch (error) {
      console.log(error);

      alert(
        "Delete failed. Admin access required."
      );
    }
  };

  const exportCSV = async () => {
    try {
      const res = await api.get(
        "/leads/export/csv",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "leads.csv"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();
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

          <button
            onClick={exportCSV}
            className="bg-green-500 px-6 py-3 rounded-2xl font-semibold"
          >
            Export CSV
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-linear-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
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
                    <button
                      disabled
                      className="bg-yellow-500/50 px-4 py-2 rounded-xl cursor-not-allowed"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="bg-red-500 px-4 py-2 rounded-xl"
                    >
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
      {
        showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6">
                Create Lead
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={leadData.name}
                  onChange={(e) =>
                    setLeadData({
                      ...leadData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-2xl bg-black/30 border border-white/10"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={leadData.email}
                  onChange={(e) =>
                    setLeadData({
                      ...leadData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-2xl bg-black/30 border border-white/10"
                />

                <select
                  value={leadData.status}
                  onChange={(e) =>
                    setLeadData({
                      ...leadData,
                      status: e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-2xl bg-black/30 border border-white/10"
                >
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

                <select
                  value={leadData.source}
                  onChange={(e) =>
                    setLeadData({
                      ...leadData,
                      source: e.target.value,
                    })
                  }
                  className="w-full p-4 rounded-2xl bg-black/30 border border-white/10"
                >
                  <option value="website">
                    Website
                  </option>

                  <option value="instagram">
                    Instagram
                  </option>

                  <option value="referral">
                    Referral
                  </option>
                </select>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={createLead}
                    className="flex-1 bg-blue-500 py-4 rounded-2xl font-semibold"
                  >
                    Create
                  </button>

                  <button
                    onClick={() =>
                      setShowModal(false)
                    }
                    className="flex-1 bg-gray-700 py-4 rounded-2xl font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Leads;