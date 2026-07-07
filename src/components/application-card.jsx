/* eslint-disable react/prop-types */
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";

export default function ApplicationCard({ application, isCandidate = false }) {
  // Hook up the status modification backend controller API handler
  const { loading: loadingStatus, fn: fnUpdateStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application?.job_id,
    },
  );

  const handleStatusChange = (status) => {
    fnUpdateStatus(status);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank"; // Opens the asset string file path inside a clean separate browser window tab
    link.click();
  };

  return (
    <Card className="bg-slate-900/60 border-slate-800 text-white relative overflow-hidden">
      {loadingStatus && (
        <BarLoader
          width={"100%"}
          color="#36d7b7"
          className="absolute top-0 left-0"
        />
      )}

      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-xl font-bold">
          {/* Display the applicant name cleanly or point to the job title description if looking at self listings */}
          <span>
            {isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              : application?.name || "Candidate Profile"}
          </span>

          <button
            onClick={handleDownload}
            className="p-2 bg-slate-800 hover:bg-blue-600/30 border border-slate-700 text-blue-400 rounded-full transition-all"
            title="Download Resume"
          >
            <Download size={18} />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 text-sm text-slate-300">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={16} className="text-blue-400" />
            <span>{application?.experience} Years of Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <School size={16} className="text-blue-400" />
            <span>{application?.education}</span>
          </div>
          <div className="flex items-center gap-2">
            <Boxes size={16} className="text-blue-400" />
            <span>Skills: {application?.skills}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-slate-800/60 pt-3 text-xs text-slate-500">
        <span>
          Applied on: {new Date(application?.created_at).toLocaleString()}
        </span>

        {/* Render interactive status controller dropdown modifier if reviewer mode matches */}
        {isCandidate ? (
          <span
            className={`px-3 py-1 rounded-full font-semibold capitalize text-xs border ${
              application?.status === "applied"
                ? "bg-blue-950/40 border-blue-800 text-blue-400"
                : application?.status === "shortlisted"
                  ? "bg-green-950/40 border-green-800 text-green-400"
                  : "bg-red-950/40 border-red-800 text-red-400"
            }`}
          >
            Status: {application?.status}
          </span>
        ) : (
          <Select
            defaultValue={application?.status}
            onValueChange={handleStatusChange}
            disabled={loadingStatus}
          >
            <SelectTrigger className="w-[140px] h-8 bg-slate-950 border-slate-800 text-xs font-semibold text-slate-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-950 border-slate-800 text-white text-xs">
              <SelectItem value="applied" className="focus:bg-slate-800">
                Applied
              </SelectItem>
              <SelectItem
                value="shortlisted"
                className="focus:bg-slate-800 text-green-400"
              >
                Shortlisted
              </SelectItem>
              <SelectItem
                value="interviewing"
                className="focus:bg-slate-800 text-blue-400"
              >
                Interviewing
              </SelectItem>
              <SelectItem
                value="rejected"
                className="focus:bg-slate-800 text-red-400"
              >
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}
