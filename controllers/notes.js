const Note = require('../schemas/NoteSchema');

const getNotes = async( req, res ) => {



    //     const la = await Note.find({ 
        
    //      }).populate({ path: 'user', match: { '_id': id }  }).exec()
        
    //     res.send({
    //         ok:true,
    //         la
    //     })
    //   ;
   try {
       let searchCriteria = {};
       const { id} = req.params; 

        if (id) {
            searchCriteria = {
                user : {
                    _id : id
                }
            }   
        };

        const [ notes, total ] = await Promise.all([
            Note.find(searchCriteria).populate({
                                            path: 'user',
                                            select: 'id'
                                        })
                                        .collation({ locale: 'es' }),   
            Note.find(searchCriteria).countDocuments()
        ]);

        
    
        // const filter = notes.find( searchByTitle )
        
        res.status(200).json({
            ok: true,
            msg: 'Notas obtenidas',
            notes,
            total,
        });       
    
   } catch (error) {

            res.status(400).json({
                ok: false,
                msg: 'Error al obtener las notas'
            });
   }
};

const createNote = async( req, res ) => {
    const newNote = new Note( req.body );
    try {
        newNote.user = req.id
        await newNote.save()
        res.status(200).json({
            ok: true,
            note: newNote         
        });
        
    } catch (error) {  
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contactese con el administrador'
        });
    };

};

const updateNote = async( req, res ) => {
    res.json({
        ok: true,
        msg: 'Nota actualizada'
    });
};

const deleteNote = async( req, res ) => {
    res.json({
        ok: true,
        msg: 'Nota borrada'
    });

};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}