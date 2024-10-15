export type Award = {
  id: string;
  award_type: string;
  award_date: Date;
  prof_memeber_id: string | undefined;
};
export type Vacation = {
  id: string;
  sanatorium: string;
  vacation_date: Date;
  prof_memeber_id: string | undefined;
};
export type Report = {
  report_type: string;
  creator: string;
  document: string;
  status: string;
  submission_date: string;
  acceptance_date: string;
  prof_id: string;
};
