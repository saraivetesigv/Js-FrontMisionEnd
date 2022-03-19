
    function cambiarbusqueda()
    {
        if (document.getElementById('OS').value == '1'){
            document.getElementById('input1').placeholder='Nombre';
        }else{
            document.getElementById('input1').placeholder='Numero';  
        }
   
    }

    function buscarpokemon(){
        if(document.getElementById('OS').value == '' || document.getElementById('input1').value == ''){
            document.getElementById('textoa').innerHTML=  "Llenar los campos";
            return;
        }
        
        
            
        $("#tstadistic > tbody").empty();
        $("#movi").empty();
        document.getElementById('rect2').style.height = "500px";
        document.getElementById("imagepoke").src = "";
        document.getElementById("nombrep").value = "";
        document.getElementById("tipop").value = "";
        document.getElementById('textoa').innerHTML=  "";
        document.getElementById('textoa2').innerHTML=  "";
        
        let valor = document.getElementById('input1').value;
        var filter6=/[a-z][0-9]/;
        var filter7=/[a-z]/;
        var filter8=/[0-9]/;
        if(document.getElementById('OS').value == '1' ){
            if (filter6.test(valor) || filter8.test(valor)) {
               // console.log("Solo se aceptan letras");
                document.getElementById('textoa').innerHTML=  "Solo se aceptan letras";
                return;
            }
        }else if (document.getElementById('OS').value == '2' ) {
            if (filter6.test(valor) || filter7.test(valor)) {
              //  console.log("Solo se aceptan numeros");
                document.getElementById('textoa').innerHTML=  "Solo se aceptan numeros";
                return;
            }
        }
        fetchPokemon(valor);
    }      
    
    const fetchPokemon = (valor) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${valor}`;
        fetch(url).then((res) => {
          //  console.log(res.status);
            if (res.status != "200") {
             //   console.log(res);
               pokeImage("imagenes/pokebolaicon.png")
               document.getElementById('imagepoke').style.width = "30%";
              
            }
            else {
                return res.json();
            }
        }).then((data) => {
            if (data) {
               // console.log(data);
                let pokeImg = data.sprites.front_default;
                let pnombre = data.name;
                let ptipo = data.types[0].type.name;
                let pstats = data.stats;
                let pmoves = data.moves;
                pokeImage(pokeImg);
                pokeDatos(pnombre,ptipo,pstats,pmoves);
              //  console.log(pokeImg);
            }
        });
    }

    const pokeImage = (url) => {
        
        const pokePhoto = document.getElementById("imagepoke");
        document.getElementById('imagepoke').style.display = 'block';
        document.getElementById('imagepoke').style.width = "60%";
        document.getElementById('imagepoke').style.marginLeft = "auto";
        document.getElementById('imagepoke').style.marginRight = "auto";
        pokePhoto.src = url;
    }

    const pokeDatos = (nombre,tipom,stats,moves) => {
        //console.log(nombre);
        document.getElementById('nombrep').value = nombre;
        document.getElementById('tipop').value = tipom;
        var tabla = "";
           // var table = document.getElementById("tstadistic");
        stats.forEach(function(elemento, indice, array) {
            // console.log(elemento.stat.name);
            tabla = tabla+'<tr><td>'+elemento.stat.name+'</td><td>'+elemento.base_stat+'</td><tr>'
          
        } )
       //  tabla=tabla+'</tr>';
        // console.log(tabla);
         $('#tstadistic').append(tabla);

         //movimientos
         moves.forEach(function(elemento, indice, array) {
            // console.log(elemento.move.name);
            var ul = document.getElementById("movi");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(elemento.move.name));
            ul.appendChild(li);
            document.getElementById('rect2').style.height = "1050px";
         });
    }
        
       