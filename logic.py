CATEGORIES = {
    "Exercise": ["Cardio", "Strength", "Flexibility"],
    "Sleep": ["Hours Slept", "Sleep Quality"],
    "Exploration": ["Travel", "New Experiences", "Learning"],
    "Mindfulness": ["Meditation", "Journaling", "Screen Time"],
    "Career & Education": ["Study", "Skill Development", "Work Projects"],
    "Relationships": ["Family", "Friends", "Community"]
}

LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000]  # XP thresholds per level

def calculate_level(total_xp):
    level = 0
    for threshold in LEVEL_THRESHOLDS:
        if total_xp >= threshold:
            level += 1
    return level

def xp_from_action(points):
    return points  # 1-to-1 for now, you can scale later
