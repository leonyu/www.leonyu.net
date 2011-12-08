TTFS=HelveticaNeueLTCom-LtCn.ttf  HelveticaNeueLTCom-Lt.ttf  HelveticaNeueLTCom-MdCn.ttf  HelveticaNeueLTCom-Roman.ttf  HelveticaNeueLTCom-UltLt.ttf
WOFFS=$(TTFS:.ttf=.woff)
EOTS=$(TTFS:.ttf=.eot)
SVGS=$(TTFS:.ttf=.svg)
TTXS=$(patsubst %,src/%,$(TTFS:.ttf=.ttx))

all: ttf woff eot

ttx: $(TTXS)

ttf: $(TTFS)

woff: $(WOFFS)

svg: $(SVGS)

eot: $(EOTS)

src/%.ttx: src/%.ttf
	ttx $<
	sed -i 's/fsType value="00000000 00000100"/fsType value="00000000 00000000"/' $@

%.ttf: src/%.ttx
	rm -f $@
	ttx -d . $<

%.woff: %.ttf
	fontforge -c "import fontforge; f=fontforge.open('$<'); f.generate('$@');"

%.svg: %.ttf
	fontforge -c "import fontforge; f=fontforge.open('$<'); f.generate('$@');"

%.eot: %.ttf
	ttf2eot $< > $@

clean:
	rm -f *.ttf *.eot *.woff *.svg

