import gym_snake_game
import gym

"Setup environment for Reinforcement Learnin (RL)"
options = {
    'width': 20,
    'height': 20
}

env = gym.make('Snake-v0', render_mode='human',**options)

#env = gym_snake_game.make('Snake-v0', render_mode='human')

env.reset()
env.play()
env.close()
