
const makestep = require('./method');
const LINESIZE = 10000;
const STEP = 0.001;
const WAIT = 100;

function calculate(constants, updatefunc, exitfunc) {

    let C  = constants;
    let point = [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ];
    let funcs = [ () => 1, DXDT, DYgDT, DIepscsDT, DYdDT, DVDT, DNiDT, DMiDT, DHiDT ];

    iteration();

    function iteration()
    {
        let ii = LINESIZE;
        while(--ii) point = makestep(funcs, point, STEP);

        //FIXME: draw information
        updatefunc();
        if(!exitfunc()) setTimeout(iteration, WAIT);

    }

    /////////////////////////////////////////////////////////
    //                    Equations                        //
    /////////////////////////////////////////////////////////

    // params = [ t, X, Yg, Iepscs, Yd, V, n, m, h ] 

    function DXDT(params)
    {
        let x = params[1];
        let yg = params[2];
        let ipre = C.Ipre(params[0]);
        
        return -C.ax*(x - C.k0*(1 + C.gammag * yg) * H(ipre - 0.5));
    }

    function DYgDT(params)
    {
        let yg = params[2];
        let x = params[1];

        return -C.ag*(yg - Math.pow(1 + Math.exp(-(x-C.thg)/C.kg),-1));
    }

    function DIepscsDT(params)
    {
        let iepscs = params[3];
        let ipre = C.Ipre(params[0]);
        let yd = params[4];

        return -C.ai*(iepscs + C.A(yd) * H(ipre - 0.5));
    }

    function DYdDT(params)
    {
        let yd = params[4];
        let x = params[1];

        return -C.ad * (yd - Math.pow((1 + Math.exp(-(x-C.thd)/C.kd)),-1));
    }

    function DVDT(params)
    {
        let v = params[5];
        let n = params[6];
        let m = params[7];
        let h = params[8];
        let x = params[1];
        let iepscs = params[3];

        return (1/C.C)*(C.Ith - Iion(n,m,h,v) - iepscs * Math.pow(1 + Math.exp(-(x-C.thx)/C.kx),-1));
    }

    function Iion(n,m,h,v)
    {
        let Ina = C.gna*Math.pow(m,3)*h*(v-C.ENa);
        let Ik = C.gk * Math.pow(n,4)*(v-C.Ek);
        let Il = C.gl*(v - C.El);

        return Ina + Ik + Il;
    }

    function DNiDT(params)
    {
        let n = params[6];
        let v = params[5];

        return AlphaN(v)*(1-n)-BettaN(v)*n;
    }

    function DMiDT(params)
    {
        let m = params[7];
        let v = params[5];

        return AlphaM(v)*(1-m)-BettaM(v)*m;
    }

    function DHiDT(params)
    {
        let h = params[8];
        let v = params[5];

        return AlphaH(v)*(1-h) - BettaH(v)*h;
    }

    function AlphaN(v)
    {
        return (0.01 * (v + 55)) / (1 - Math.exp(0.1 * (-55 - v)));
    }

    function BettaN(v)
    {
        return 0.125 * Math.exp((-v-65)/80);
    }

    function AlphaM(v)
    {
        return (0.1*(v+40))/(1 - Math.exp(0.1*(-40-v)));
    }

    function BettaM(v)
    {
        return 4 * Math.exp((-v-65)/18);
    }

    function AlphaH(v)
    {
        return 0.07 * Math.exp(0.05*(-v-65));
    }

    function BettaH(v)
    {
        return Math.pow(1 + Math.exp(0.1*(-35-v)),-1);
    }

    function H(x)
    {
        return (1 + Math.sign(x))/2;
    }

    /////////////////////////////////////////////////////////
    //                    Generators                       //
    /////////////////////////////////////////////////////////

    /******************** Rayleigh *************************/

    function rayleighd(a,x)
    {
        return (x/(a*a))*Math.exp(-((x*x)/(2*a*a)));
    }

    function rayleigh(a)
    {
        let x = Math.random();
        return Math.sqrt(-2*a*a*Math.log(1-x));
    }

    /******************** Poisson **************************/

    function poissond(l,x)
    {
        return (Math.pow(l,x) / fuctorial(x))*Math.exp(-l);
    }

    function poisson(l)
    {
        let k = 0;

        let left = 0;
        let right = left + poissond(l,k);

        let x = Math.random();

        while(left > x || right < x)
        {
            ++k;
            left = right;
            right = left + poissond(l,k);
        }

        return k;
    }
}

module.exports = calculate;
