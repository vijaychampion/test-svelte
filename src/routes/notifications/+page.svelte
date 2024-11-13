<script>
  import { onMount } from "svelte";
  import Notification from "../../components/Notification/Notification.svelte";

  let notifications = [];

  async function loadNotifications() {
    try {
      const response = await fetch("./api/notifications");
      const data = await response.json();

      notifications = data.notifications.map((notification) => ({
        id: notification.id,
        name: notification.user_name,
        action: notification.action_text,
        event: notification.show_name,
        message: notification.message,
        time: new Date(notification.time),
        avatar: notification.profile_image,
        statusIcon: notification.status_icon,
      }));

      console.log("Loaded Notifications:", notifications);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }

  onMount(() => {
    loadNotifications();
  });
</script>

<Notification {notifications} />
