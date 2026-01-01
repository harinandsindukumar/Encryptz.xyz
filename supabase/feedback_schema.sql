-- Create the feedback table
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('feedback', 'report')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed'))
);

-- Enable Row Level Security (RLS) - in case you want to restrict access
-- ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- If you want to allow anyone to submit feedback (no auth required)
-- You would not create policies that require authentication
-- The table can accept inserts from anyone but only admins can view

-- Create an index for better performance on created_at
CREATE INDEX idx_feedback_created_at ON feedback(created_at);

-- Create an index for filtering by type
CREATE INDEX idx_feedback_type ON feedback(type);

-- Create an index for filtering by status
CREATE INDEX idx_feedback_status ON feedback(status);