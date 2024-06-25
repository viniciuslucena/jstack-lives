import { useUsers } from "@/app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Switch } from "./ui/Switch";
import { Skeleton } from "./ui/Skeleton";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { cn } from "@/app/libs/utils";

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleBlockedChange(id: string, blocked: boolean) {
    await updateUser({ id, blocked });
  }

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[73px]" />
          <Skeleton className="h-[73px]" />
          <Skeleton className="h-[73px]" />
          <Skeleton className="h-[73px]" />
        </>
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className={cn(
            "border p-4 rounded-md flex items-center justify-between",
            user.status === "pending" && "opacity-70",
            user.status === "error" && "border-destructive bg-destructive/20"
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={`https://www.github.com/${user.username}.png`}
              />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>
          </div>

          <Switch
            checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockedChange(user.id, blocked)}
            disabled={user.status === "pending"}
          />
        </div>
      ))}
    </div>
  );
}
