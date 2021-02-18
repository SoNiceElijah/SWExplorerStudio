
function RK4(f,p,h)
{   
    if(!Array.isArray(f))
        throw "RK-4 wrong parameter f";

    if(!Array.isArray(p))
        throw "RK-4 wrong parameter p";

    if(typeof h != 'number')
        throw "RK-4 wrong parameter h";

    if(p.length != f.length)
        throw "RK-4 wrong parameters";

    let n = p.length;
    
    let k1 = [];
    let k2 = [];
    let k3 = [];
    let k4 = [];

    k1.push(1);
    for(let i = 1; i < n; ++i)
    {
        k1.push(f[i](p));
    }

    let p2 = [];
    for(let i = 0; i < n; ++i)
    {
        p2.push(p[i] + (h/2)*k1[i]);
    }

    k2.push(1);
    for(let i = 1; i < n; ++i)
    {
        k2.push(f[i](p2));
    }

    let p3 = [];
    for(let i = 0; i < n; ++i)
    {
        p3.push(p[i] + (h/2)*k2[i]);
    }

    k3.push(1);
    for(let i = 1; i < n; ++i)
    {
        k3.push(f[i](p3));
    }

    let p4 = [];
    for(let i = 0; i < n; ++i)
    {
        p4.push(p[i] + (h)*k3[i]);
    }

    k4.push(1);
    for(let i = 1; i < n; ++i)
    {
        k4.push(f[i](p3));
    }

    let res = [];
    for(let i = 0; i < n; ++i)
    {
        res.push(p[i] + (h/6)*(k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }

    return res;
}

module.exports = RK4;