import math


def isPrime(S):
    return recursivePrime(S, S)


def recursivePrime(S, newS):
    boundaryValue = math.floor(mSqrt(newS))
    retVal = True if newS > 1 else False
    it = 2
    while it <= boundaryValue and retVal:
        if recursivePrime(S, it) and S % it != 0:
            retVal = retVal and True
        else:
            retVal = retVal and False
        it = it + 1
    return retVal


def mSqrt(x):
    return cSqrt(x, x/2)


def cSqrt(S, x):
    x1 = nextApproximateValue(S, x)
    diff = x - x1
    modDiff = diff if diff >= 0 else -diff
    return x1 if modDiff <= pow(2, -4) else cSqrt(S, x1)


def nextApproximateValue(S, x):
    return (x*x + S)/(2*x)


def countPrimeFactorsInRange(n):
    x = 1
    val = 0
    iterator = 2
    r = math.ceil(mSqrt(n))
    while iterator <= r and x <= n and x*iterator <= n:
        if isPrime(iterator):
            x *= iterator
            val += 1
        iterator += 1
    return val


# def countPrimeFactors(n):
#     x = 1
#     counter = 0
#     r = math.ceil(mSqrt(n))
#     for it in range(1, r):
#         if (x < n) and (it == 1 or isPrime(it)) and (x*it <= n):
#             x *= it
#             counter += 1 if it != 1 or isPrime(n/it) else 0
#             print(counter, it, x)
#         elif x*it > n:
#             break
#         print(it)
#     return counter


# print( (isPrime(1) == False) and (isPrime(2) == True) and (isPrime(3) == True) and  (isPrime(4) == False) and (isPrime(5) == True) and (isPrime(6) == False) and (isPrime(7) == True) and (isPrime(8) == False) and (isPrime(9) == False) and (isPrime(10) == False) and (isPrime(11) == True) and (isPrime(12) == False) and (isPrime(13) == True));

# print(isPrime(17))
# print(countPrimeFactors(2),countPrimeFactors(3),countPrimeFactors(4),countPrimeFactors(6),countPrimeFactors(8),countPrimeFactors(500))


# print(countPrimeFactors(1));
# print(countPrimeFactors(2));
# print(countPrimeFactors(3));
# print(countPrimeFactors(500));
# print(countPrimeFactors(5000));
# print(mSqrt(10000000000));
# print(countPrimeFactors(10000000000));
# cp = 0
# for i in range(1, 10000):
#     if isPrime(i):
#         cp += 1
#         print(i, isPrime(i))
# print(cp)

# print(isPrime(4));
# print(isPrime(3));

# print(countPrimeFactorsInRange(1));
# print(countPrimeFactorsInRange(2));
# print(countPrimeFactorsInRange(3));
# print(countPrimeFactorsInRange(500));
# print(countPrimeFactorsInRange(5000));
print(countPrimeFactorsInRange(1000000000000000000));
print(countPrimeFactorsInRange(2013172519));print(countPrimeFactorsInRange(1785651542));


# print(countPrimeFactorsInRange(595002220))

# ps = "";
# for it in range(50):
# ps += str(it) + ',' if it > 0 and isPrime(it) else '';

# print(ps);
