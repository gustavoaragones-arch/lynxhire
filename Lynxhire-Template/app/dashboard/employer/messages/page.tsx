import { DashboardHeader } from "@/components/dashboard/header";

export default function EmployerMessagesPage() {
  return (
    <>
      <DashboardHeader
        title="Messages"
        subtitle="Conversations with candidates"
      />
      <main className="flex-1 p-6">
        <p className="text-muted-foreground">
          Messaging — coming in Prompt 5
        </p>
      </main>
    </>
  );
}
