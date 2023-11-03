# Creative-coding-major-project-Xuanfan-Zhao
This code is a modified visualisation project based on the team's work, creating a cityscape with Random Seed and Perlin noise functions.
Perlin noise function is a continuous random function, which is characterised by a certain continuity near adjacent input values, resulting in a more natural random change. In this code, the Perlin noise function is used to calculate the height of the building and the location of the street.
In the building height calculation section, the Perlin noise function is used twice:
buildingHeights[i] += map(noise(i * 0.9, frameCount * 0.01), 0, 1, -1, 1);
Here the noise function is used to make the height of the building change over time, i is the index of the building, frameCount is the current frame number, by mapping the noise value to a certain range, to control the change of the height of the building.
buildingHeights[i] = constrain(buildingHeights[i], 400, 900);
This line of code ensures that the height of the building remains between 400 and 900, avoiding height variations out of range.
For the last iteration, I wanted to add something interesting and creative looking, so I changed the part here to look like a kaleidoscope.
In general, the combination of Random Seed and Perlin noise function makes the building height and street location present natural and continuous random changes, adding vivid features to the urban landscape.


