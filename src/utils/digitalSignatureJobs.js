'use client'

import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const getJobName = (job) => {
    if (job.folderLink) {
      return job.folderLink.split("\\").pop() || "Untitled Job";
    }
    return "Untitled Job";
}

export const getJobDocuments = (job) => {
    return job.signatureStatuses ? job.signatureStatuses.length : "--"
}

export const getJobSignatures = (job) => {
    return job.signatureStatuses ? job.signatureStatuses.filter(signature => signature.status === "success").length : "--"
}

export const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlineIcon className="text-green-500" size={20} />;
      case 'processing':
        return <AccessTimeIcon className="text-blue-500" size={20} />;
      case 'queued':
        return <HourglassTopIcon className="text-gray-500" size={20} />;
      case 'failed':
        return <ErrorOutlineIcon className="text-red-500" size={20} />;
      default:
        return <AccessTimeIcon className="text-gray-500" size={20} />;
    }
};

export const getStatusVariant = (status) => {
    switch (status) {
        case 'completed':
        return 'success';
        case 'processing' || 'queued':
        return 'info';
        case 'failed':
        return 'error';
        default:
        return 'default';
    }
};