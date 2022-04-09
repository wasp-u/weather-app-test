export const getColorForTemperature = function (t: number) {
    let a = (t + 30) / 60
    a = a < 0 ? 0 : a > 1 ? 1 : a

    const sign = a < 0.5 ? -1 : 1
    a = (sign * Math.pow(2 * Math.abs(a - 0.5), 0.35)) / 2 + 0.5

    return `hsla(${Math.round(259 * (1 - a) + 12 * a)},90%,80%,1)`
}
