"use client";

import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import { useAuth } from "@/components/AuthProvider.jsx";
import { useState, useEffect } from "react";
import SlideAlert from "@/components/SlideAlert.jsx";
import RefreshIcon from '@mui/icons-material/Refresh';
import { CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Badge from "@/components/Badge.jsx";
import Button from "@/components/Button.jsx";
import Input from "@/components/Input.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutIcon from '@mui/icons-material/Logout';
import JobDetailsModal from "@/components/JobDetailsModal.jsx";
import { getJobDocuments, getJobName, getJobSignatures, getStatusIcon, getStatusVariant } from "@/utils/digitalSignatureJobs.js";

export default function DashboardPage() {
  const { signOut } = useAuth();
  const [folderLink, setFolderLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState("");
  const [alert, setAlert] = useState({ message: "", severity: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert({ message: "", severity: "" });
    setJobId("");

    try {
      const res = await fetch("/api/create-signature-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folderLink }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setJobId(data.jobId);
      setAlert({ message: `Job created! Job ID: ${data.jobId}`, severity: "success" });

      // Refresh the jobs
      fetchJobs()
    } catch (err) {
      setAlert({ message: err.message, severity: "error" });
    }
    setIsSubmitting(false);
  };

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/retrieve-signature-jobs");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch jobs");

      setJobs(data.jobs.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt))));
    } catch (err) {
      setAlert({ message: err.message, severity: "error" });
    }

    setLoading(false)
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Digital Signature Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your document signing workflows
                </p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Button
                  variant="outline"
                  onClick={() => fetchJobs()}
                >
                  <RefreshIcon size={10} className="mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" onClick={signOut}>
                  <LogoutIcon size={10} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Create New Job Section */}
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Create New Signature Job
              </h2>
              <div onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Folder Link"
                  placeholder="P:\RE-11158 Meher Pada Byculla, Roha Realty\For Posting\250901 TYPICAL DETAIL OF JACKETING-A"
                  value={folderLink}
                  onChange={(e) => setFolderLink(e.target.value)}
                  disabled={isSubmitting}
                  helperText="Paste the link to the folder containing documents to be signed"
                />
                
                {alert.message && (
                  <SlideAlert alertDetails={alert}/>
                )}
                
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!folderLink.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={20} />
                      <span className="ml-2">Creating Job...</span>
                    </>
                  ) : (
                    <>
                      <AddIcon size={16} className="mr-2" />
                      Create Job
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Jobs ({jobs.length})
            </h2>
            
            <div className="grid gap-4">
              {jobs.map((job) => (
                <button key={job.id} className="hover:shadow-md transition-shadow cursor-pointer bg-white rounded-lg shadow-sm items-start border border-gray-200" onClick={() => onJobClick(job)}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 flex flex-col items-start">
                        <div className="flex items-center space-x-3 mb-3">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg font-medium text-gray-900">
                            {getJobName(job)}
                          </h3>
                          <Badge variant={getStatusVariant(job.status)}>
                            {job.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-col items-start text-start space-y-2 text-sm text-gray-600">
                          <p>Created: {new Date(job.createdAt).toLocaleString()}</p>
                          {job.completedAt && (
                            <p>Completed: {new Date(job.completedAt).toLocaleString()}</p>
                          )}
                          <div className="flex space-x-6">
                            <span>Documents: {getJobDocuments(job)}</span>
                            <span>Signatures: {getJobSignatures(job)}</span>
                          </div>
                          {job.signedFolder && (
                            <p>Signed folder: {job.signedFolder}</p>
                          )}
                          {job.error && (
                            <p className="text-red-600">Error: {job.error}</p>
                          )}
                        </div>
                      </div>
                      
                      <button
                        className="text-gray-500 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <VisibilityIcon size={20} />
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <JobDetailsModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
}