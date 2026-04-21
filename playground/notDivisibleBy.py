import math

math.add(2, 3)


st = 100
ed = 202
counter = 0
for x in range(st, ed+1, 1):
    if (x % 2 != 0 and x % 3 != 0 and x % 5 != 0):
        counter = counter + 1


print('val', counter)


def divsibles(mod, noMod, den=None):
    def rem(num, tm): return num % tm

    def test(ed, st, mod):
        e = ed - rem(ed, mod)
        sr = rem(st, mod)
        subr = mod - sr if sr != 0 else 0
        s = st + subr
        div = den or mod*1
        return e, s, div
    e, s, div = test(ed, st, mod)

    if noMod != None:
        e = e - mod if rem(e, noMod) == 0 else e
        s = s + mod if rem(s, noMod) == 0 else s
        div = den or mod*noMod

    return (e - s)/div + 1


twodiv = divsibles(2, None)
print('2s: ', twodiv)
threediv = divsibles(3, 2)
print('3s: ', threediv)
fivebutnottwodiv = divsibles(5, 2)
print('5 but not 2s: ', fivebutnottwodiv)
byfiveandthreediv = divsibles(15, 2)
print('by 5 and 3s: ', byfiveandthreediv)
onlyfivediv = fivebutnottwodiv - byfiveandthreediv
print('only five : ', onlyfivediv)


notdiv = (ed - st + 1) - twodiv - threediv - onlyfivediv
print('cal: ', notdiv)
