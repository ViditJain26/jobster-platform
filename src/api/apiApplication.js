import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// - Apply to job ( candidate )
// Structural signature adjusted to handle hook alignment (token, options, payload)
export async function applyToJob(token, options, jobData) {
  // Gracefully adapt if useFetch passes the form payload as the second parameter slot
  const actualJobData = jobData ? jobData : options;

  // Robust fallback chain to capture the candidate ID string under any naming scheme
  const candidateId =
    actualJobData?.candidate_id ||
    actualJobData?.user_id ||
    actualJobData?.userId ||
    actualJobData?.id;

  const supabase = await supabaseClient(token);

  // Generate a safe unique file name using the resolved ID sequence
  const random = Math.floor(Math.random() * 90000);
  const cleanId = candidateId
    ? String(candidateId).replace(/[^a-zA-Z0-9]/g, "")
    : "anonymous";
  const fileName = `resume-${random}-${cleanId}`;

  // 1. Upload the real binary file payload directly to your resumes storage bucket
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, actualJobData.resume);

  if (storageError) {
    console.error("Storage Error Detail:", storageError);
    throw new Error("Error uploading Resume to Storage");
  }

  // 2. Build the absolute public asset source string URL
  const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // 3. Insert metadata matching the database table column definitions strictly
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        job_id: actualJobData.job_id,
        candidate_id: candidateId,
        name: actualJobData.name, // 🚀 FIXED: Saves the candidate's real name string to the DB column!
        status: actualJobData.status || "applied",
        experience: Number(actualJobData.experience) || 0,
        skills: actualJobData.skills || "",
        education: actualJobData.education || "",
        resume: resumeUrl,
      },
    ])
    .select();

  if (error) {
    console.error("Database Insertion Error Details:", error);
    throw new Error("Error submitting Application to Database");
  }

  return data;
}

// - Edit Application Status ( recruiter )
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

// - Get Applications for a specific candidate
export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
