import streamlit as st
import pandas as pd
from db import init_db, add_log, get_logs
from logic import CATEGORIES, calculate_level, xp_from_action

# Initialize DB
init_db()

st.title("🌱 Life RPG Tracker")

# Log activity
st.header("Log an Activity")
category = st.selectbox("Choose a category", list(CATEGORIES.keys()))
points = st.slider("How many points to award?", 1, 50, 10)

if st.button("Log Activity"):
    xp = xp_from_action(points)
    add_log(category, xp)
    st.success(f"Added {xp} XP to {category}!")

# Show logs
st.header("Recent Logs")
logs = get_logs()
df = pd.DataFrame(logs, columns=["Category", "Points", "Timestamp"])
st.dataframe(df)

# Calculate total XP + level
total_xp = df["Points"].sum() if not df.empty else 0
level = calculate_level(total_xp)

st.metric("Total XP", total_xp)
st.metric("Level", level)
