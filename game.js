const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

// state function equal to empty object to keep track of state 
let state = {}

function startGame () {
    state = {};
    // showing very first text node
    showTextNode(1);
}

// shows which option we are on w/ parameter of index of particular node
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    // removing options; while it has a first child we want to remove it 
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    // looping through all options that are available based of choices/options; 
    textNode.options.forEach(option => {
        // can we show that node? if so run this function 
        if (showOption(option)) {
            // creating option/choices to be selected from
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    })
}

// checks for a required state object
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

// takes option we select; 
function selectOption(option) {
    // 
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    // this takes our state currently and add everything from option setState to it and override anything already there; state information will work properly based on user selecting choice/option
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

// holds textNodes w text property and options array
const textNodes = [
    {
        id: 1,
        text: "Text node 1 test",
        options: [
            {
                text: 'choice one',
                setState: {choiceOne: true},
                nextText: 2
            },

            {
                text: 'choice two',
                nextText: 2,

            }
        ]
    },

    {
        id: 2,
        text: 'text node 2 test',
        options: [
            {
                // this requires user choosing option one/choice one in previous node for these options to show up
                text: 'node 2 choice one',
                requiredState: (currentState) => currentState.choiceOne,
                setState: { choiceOne: false, nodeTwoChoiceTrue: true},
                nextText: 3
            },

            {
                text: 'node 2 choice two',
                requiredState: (currentState) => currentState.choiceOne,
                setState: { choiceOne: false, nodeThreeChoiceTrue: true},
                nextText: 3
            },

            {
                text: 'node 2 choice three',
                nextText: 3
            }
        ]
    },

    {
        id: 3,
        text: 'text node 3 test',
        options: [
            {
                text: 'node 3 choice one',
                nextText: 4
            },

            {
                text: 'node 3 choice two',
                nextText: 5
            },

            {
                text: 'node 3 choice three',
                nextText: 6
            }
        ]
    },

    {
        id: 4,
        text: 'text node 4',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

// calling start game when page loads
startGame();