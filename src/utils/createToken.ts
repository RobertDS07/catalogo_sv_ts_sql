import jwt from 'jsonwebtoken'

interface userId {
    id: number
}

const createToken = <T extends userId>(user: T) => {
    const token = jwt.sign({ user }, process.env.SECRET || 'asjhd7h12d1', {
        expiresIn: '365d',
    })

    return { token }
}

export default createToken
