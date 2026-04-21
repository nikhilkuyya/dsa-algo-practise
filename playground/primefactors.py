#!/bin/python3

import os
import sys
import math


def isPrime(S):
    boundaryValue = math.floor(mSqrt(S))
    retVal = True if S > 1 else False
    it = 2
    while it <= boundaryValue and retVal:
        retVal = isPrime(it) and S % it != 0
        it = it + 1
    return retVal


def mSqrt(x):
    return cSqrt(x, x/2)


def cSqrt(S, x):
    x1 = nextApproximateValue(S, x)
    diff = x - x1
    modDiff = diff if diff >= 0 else -diff
    return x1 if modDiff <= pow(2, -51) else cSqrt(S, x1)


def nextApproximateValue(S, x):
    return (x*x + S)/(2*x)


def countPrimeFactors(n):
    x = 1
    counter = 0
    for it in range(n + 1):
        if it >= 2 and isPrime(it) and x <= n and x*it <= n:
            x *= it
            it += 1
            counter += 1
    return counter
#
# Complete the primeCount function below.
#


def primeCount(n):
    return countPrimeFactors(n)


if __name__ == '__main__':

    q = int(input())

    for q_itr in range(q):
        n = int(input())

        result = primeCount(n)
