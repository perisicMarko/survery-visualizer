


/* example 
"type": "multiple",
    "difficulty": "hard",
    "category": "Entertainment: Video Games",
    "question": "In &quot;Team Fortress 2&quot;, how much health does a scout have when overhealed?",
    "correct_answer": "185",
    "incorrect_answers": [
        "215",
        "195",
        "225"
    ]
*/
export type question = {
    "type": string,
    "difficulty": string, //mapping hard -> 3, medium -> 2 and easy -> 1
    "category": string,
    "question": string,
    "correct_answer": string,
    "incorrect_answers": [string]
}