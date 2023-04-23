import 'mocha';
import {expect} from 'chai';
import {Funko, FunkoGen, FunkoTipo} from '../../src/ejercicio-funko/funko.js'

describe('Funko methods tests', () => {
    
    const funko1 = new Funko(1,'Harry Potter','Harry Potter CoS 20th','p','pt','Harry Potter', 149,false,'',12)
    const funko2 = new Funko(2,'Snoop Dog','Snoop Dogg - (1 in 6 Chance of Receiving The Rare Chase Version','vg','m','Snoop Dog', 55,true,'rare chase version',12.89)
    
    it('getID test', () => {
        expect(funko1.getID()).to.be.equal(1);
        expect(funko2.getID()).to.be.equal(2);    
    });
    it('getName test', () => {
        expect(funko1.getName()).to.be.equal('Harry_Potter');
        expect(funko2.getName()).to.be.equal('Snoop_Dog');    
    });
    it('getDesc test', () => {
        expect(funko1.getDesc()).to.be.equal('Harry Potter CoS 20th');
        expect(funko2.getDesc()).to.be.equal('Snoop Dogg - (1 in 6 Chance of Receiving The Rare Chase Version');    
    });
    it('getTipo test', () => {
        expect(funko1.getTipo()).to.be.equal('Pop!');
        expect(funko2.getTipo()).to.be.equal('Vynil Gold');    
    });
    it('getGen test', () => {
        expect(funko1.getGen()).to.be.equal('Peliculas y TV');
        expect(funko2.getGen()).to.be.equal('Musica');    
    });
    it('getFran test', () => {
        expect(funko1.getFran()).to.be.equal('Harry Potter');
        expect(funko2.getFran()).to.be.equal('Snoop Dog');    
    });
    it('getNum test', () => {
        expect(funko1.getNum()).to.be.equal(149);
        expect(funko2.getNum()).to.be.equal(55);    
    });
    it('getExc test', () => {
        expect(funko1.getExc()).to.be.equal(false);
        expect(funko2.getExc()).to.be.equal(true);    
    });
    it('getEsp test', () => {
        expect(funko1.getEsp()).to.be.equal('');
        expect(funko2.getEsp()).to.be.equal('rare chase version');    
    });
    it('getVal test', () => {
        expect(funko1.getVal()).to.be.equal(12);
        expect(funko2.getVal()).to.be.equal(12.89);    
    });
});