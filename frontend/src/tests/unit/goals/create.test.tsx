import CreateGoal from "@/pages/goals/create";
import { render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

let mockRouter;
beforeEach(() => {
  mockRouter = {
    asPath: "/goals/create",
    push: vi.fn(),
  };

  vi.mock("next/router", () => ({
    useRouter: () => mockRouter,
  }));
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("goals/create.tsx", () => {
  it("should get user id if session is not null", () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { name: "test", email: "test@test.com", id: "testId" },
    };
    render(
      <SessionProvider session={mockSession}>
        <CreateGoal />
      </SessionProvider>
    );

    expect(mockSession?.user.id).toBe("testId");
  });

  it("should redirect to login page if session is null", () => {
    render(
      <SessionProvider session={null}>
        <CreateGoal />
      </SessionProvider>
    );

    expect(mockRouter.push).toHaveBeenCalledWith("/auth/login");
  });
});
