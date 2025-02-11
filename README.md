Frogger Game Development Report

Features of the Game

The game is a modern take on the classic Frogger concept, where the player controls a frog attempting to cross a series of obstacles to reach a safe zone. The current features include:

	Start Screen: Displays game instructions before the player starts.
	Score System: Tracks successful crossings.
	Lives System: The player starts with three lives, losing one upon collision.
	Pause Functionality: Allows pausing and resuming the game using the spacebar.
	Game Over Screen: Displays the final score when all lives are lost.
	Obstacle Movement: Cars and other obstacles move across the screen, requiring precise timing to avoid.
	Collision Sound Effect: A sound is triggered when the frog collides with an obstacle to enhance feedback.


Challenges Faced and Solutions
Additional Features (Not Yet Merged)

I attempted to implement the following features but have not fully merged them into the main branch due to a merge conflict:

1. Victory Condition: The game recognizes when a player has successfully won.
Customizable Win Condition: The number of successful crossings required to win is calculated dynamically based on the canvas width.


2. UI Design and Usability Issues
Challenge: Initially, I designed a UI that I liked, but when integrated, the obstacle movement was too fast and overcrowded, making the game unplayable.
Solution: I scrapped that version and created a new UI branch with a simpler design, balancing aesthetics and playability.

3. Merge Conflict in Game Logic
Challenge: While adding extra features (such as victory conditions and collision sounds), I encountered a Git merge conflict in game.js, preventing a smooth integration.
Solution: I identified the conflict markers and plan to manually merge the features to ensure both sets of changes are preserved.


Future Improvements

Fully merge the additional features branch.
Improve obstacle movement for better difficulty scaling.
Introduce power-ups like temporary invincibility or slow motion.
Enhance graphics with animated elements.
 
