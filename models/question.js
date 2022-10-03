class Question {
    constructor(
        id,
        title,
        ans_1,
        ans_2,
        ans_3, 
        ans_4,
        correct_ans,
        category,
        authorId,
        authorName,
        isAuthorized,
    ) {
        this.id = id
        this.question = title
        this.awnsers = [ans_1, ans_2, ans_3, ans_4]
        this.correct = correct_ans
        this.category= category
        this.authorId = authorId
        this.authorName = authorName
        this.isAuthorized = isAuthorized
    }
}

export default Question;