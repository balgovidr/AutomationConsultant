'use client'

import Modal from "./Modal";
import Badge from "./Badge";
import Button from "./Button";
import { getJobDocuments, getJobName, getJobSignatures, getStatusVariant, getStatusIcon } from "@/utils/digitalSignatureJobs";

const JobDetailsModal = ({ job, isOpen, onClose }) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getJobName(job)}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusVariant(job.status)}>
            {job.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Created</p>
            <p className="font-medium">{new Date(job.createdAt).toLocaleString()}</p>
          </div>
          {job.completedAt && (
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="font-medium">{new Date(job.completedAt).toLocaleString()}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">Documents Processed</p>
            <p className="font-medium">{getJobDocuments(job)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Signatures Collected</p>
            <p className="font-medium">{getJobSignatures(job)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Folder Link</p>
          <p className="text-sm break-all text-blue-600">
            {job.folderLink}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Files processed:</p>
          <div className="space-y-2">
            {job.signatureStatuses && job.signatureStatuses.length > 0 && job.signatureStatuses.map((signature, index) => (
              <div key={index} className="flex flex-row rounded-md bg-gray-100 p-2 gap-2 items-center">
                {getStatusIcon(job.status)}
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600 mb-1">File: {signature.file}</p>
                  {signature.output_path && (
                    <p className="text-xs text-gray-600">
                      Output Path: <span className="text-blue-600">{signature.output_path}</span>
                    </p>
                  )}
                  {signature.error && (
                    <p className="text-sm text-red-600">Error: {signature.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {job.error && (
          <p className="text-red-600">Error: {job.error}</p>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;