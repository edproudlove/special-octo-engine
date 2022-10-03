import Question from '../models/question'
import Category from '../models/category'


export const QUESTIONS = [
    new Question('1', 'What is the capital of England?', 'New York', 'Paris', 'Bradford', 'London', 'London', ['c1', 'c4']),
    new Question('2', 'What is the capital of Germany?', 'France', 'Paris', 'Bradford', 'Berlin', 'Berlin', ['c1']),
    new Question('3', 'What is the capital of China?', 'New York', 'Ghana', 'Carhold', 'Bejing', 'Bejing', ['c1']),
    new Question('4', 'Since 2011, Brendan O’Carroll has played the title character in what sitcom?', 'Mrs. Brown’s Boys','Mrs. Brown’s Babes','Mrs. Brown’s Baboons','Mrs. Brown’s Bust Ups','Mrs. Brown’s Boys',['c8']),
    new Question('5', 'The national flag of which of these countries does not feature three horizontal stripes?', 'Russia','Romania','Hungary','Germany','Romania',['c1'],),
    new Question('6', 'What was the Turkish city of Istanbul called before 1930?', 'Constantinople', 'Konya', 'Ankara', 'Izmir', 'Constantinople', ['c1', 'c2']),
]



export const CATEGORIES = [
    new Category('c1', 'Geography', '#f5428d', 'StartGame'),
    new Category('c2', 'History', '#f54242', 'StartGame'),
    new Category('c3', 'Languages', '#f5a442', 'StartGame'),
    new Category('c4', 'England', '#f5d142', 'StartGame'),
    new Category('c5', 'Sport', '#368dff', 'StartGame'),
    new Category('c6', 'Ancient Rome', '#41d95d', 'StartGame'),
    new Category('c7', 'Norse', '#9eecff', 'StartGame'),
    new Category('c8', 'TV and Film', '#b9ffb0', 'StartGame'),
    new Category('c9', 'Cars', '#ffc7ff', 'StartGame'),
    new Category('c10', 'Music', '#47fced', 'StartGame'),
    new Category('c11', 'Random', 'white', 'StartGame'),
    new Category('c12', 'Add New Question', '#a84702', 'AddQuestionScreen'),

  ];


  

