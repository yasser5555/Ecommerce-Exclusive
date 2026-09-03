import { useProfileStore } from "../Store/profile.store";

export const useProfile = () => {
  return useProfileStore();
};

export const fetchStats = async (profile, GetProfileStats) => {
  try {
    if (!profile?.id) return;
    await GetProfileStats(profile.id);
  } catch (e) {
    console.error("Error fetching profile stats:", e);
  }
};
