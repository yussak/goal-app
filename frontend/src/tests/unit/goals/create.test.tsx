import CreateGoal from "@/pages/goals/create";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

describe("goals/create.tsx", () => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: "test", email: "test@test.com", id: "testId" },
  };
  vi.mock("next/router", () => ({
    useRouter: () => ({
      asPath: "/goals/create",
    }),
  }));
  it("should get user id if session is not null", () => {
    render(
      <SessionProvider session={mockSession}>
        <CreateGoal />
      </SessionProvider>
    );

    expect(mockSession?.user.id).toBe("testId");
  });
});
