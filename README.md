# BBEdit Recovery

So over the last few years as a developer I've experienced three instances of a [MacBook swollen battery](https://www.consumerreports.org/laptop-computers/some-macbook-pro-batteries-can-swell-what-you-need-to-know/). I do not know if I'm just scripting too much, too many projects with `npx` calls for React :zany_face:, or just simply bad luck. Either way I've found over time I was manually copying over my BBEdit settings to my NAS and thought there has got to be a better way to backup.

To resolve the headache of copying over and since I've enjoyed writing more in Node I thought it be fun to write a CLI to help anyone else. At current standing this is very basic but in my free time (if ever :roll_eyes:) I'm thinking of building in a `launchd` setup that pushes to a repository.

## Installation
