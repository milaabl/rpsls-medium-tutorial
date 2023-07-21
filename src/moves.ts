import rockIcon from "assets/icons/moves/rock.jpg";
import paperIcon from "assets/icons/moves/paper.jpg";
import scissorsIcon from "assets/icons/moves/scissors.jpg";
import lizardIcon from "assets/icons/moves/lizard.jpg";
import spockIcon from "assets/icons/moves/spock.jpg";

export enum Move {
    Null,
    Rock,
    Paper,
    Scissors,
    Lizard,
    Spock
}

export const moves = [
    Move.Rock,
    Move.Paper,
    Move.Scissors,
    Move.Lizard,
    Move.Spock
];

export const moveIcons = [
    rockIcon,
    paperIcon,
    scissorsIcon,
    lizardIcon,
    spockIcon
];