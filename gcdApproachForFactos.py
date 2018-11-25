
def customGcd(a, b):
    while(b):
        t = b
        b = a % b
        a = t
    return a


def countPrimeNumberFactor(n):
    primeProd = 2
    pfCount = 0 if n < 2 else 1
    iterator = 3
    while iterator*primeProd <= n:
        if customGcd(primeProd, iterator) == 1:
            primeProd *= iterator
            pfCount += 1
        iterator += 2
    return pfCount


print(countPrimeNumberFactor(6))
