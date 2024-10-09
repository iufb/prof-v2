export type Award = {
  id: string;
  award_type: string;
  award_date: Date;
  prof_memeber_id: string | null;
};
export type Vacation = {
  id: string;
  sanatorium: string;
  vacation_date: Date;
  prof_memeber_id: string | null;
};
