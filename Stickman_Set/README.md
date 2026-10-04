# Stickman_Set

Reusable articulated stickman animation library for the HyperFrames project.

## Structure

- 00_Rig — thick point-based rig, helpers and shared CSS
- 01_Locomotion — idle, walk, slow/fast/backward walk, run, sprint, stop
- 02_Vertical — crouch, stand, jump, high jump, fall, get up
- 03_Interaction — point, think, push, pull, type
- 04_Combat — front kick, jab, hit reaction
- 05_Emotion — wave, nod, shake head, happy, sad, angry, clap
- 06_Sport_Special — squat, stretch, dance bounce, kick ball
- Export — reserved for rendered GIF/MP4/PNG-sequence assets

The rig is pose-driven. Each pose defines joint positions and the renderer interpolates thick SVG limbs between poses. This avoids brittle nested-pivot rotation and makes walk cycles easier to tune.
