var express = require('express');
var router = express.Router();
var SliderModule = require("../modules/slider");
// const { path } = require('../app');

var fs = require('fs');

// Images Inserd
var multer  = require('multer');
var path = require('path');

var Storage = multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cd)=>{
        cd(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
});
var upload = multer ({
    storage:Storage
}).single('file');

// File Delect
function deleteFile (file) { 

    if(fs.existsSync(file)) {
        fs.unlink(file, function (err) {
            if (err) {
                console.error(err.toString());
            } else {
                console.warn(file + ' deleted');
            }
        });
    }
}



/* GET home page. */
router.get('/slider', function(req, res, next) {
    SliderModule.find((err, docs)=> {
        res.render('slider',{
            list: docs,
        } )
    })
});

router.post('/slider/add',upload, (req, res) => {
    insertRecord(req, res);
});

function insertRecord(req, res) {
    var slider = new SliderModule();
    slider.fullName = req.body.fullName;
    slider.email = req.body.email;
    slider.mobile = req.body.mobile;
    slider.city = req.body.city;
    slider.image = req.file.filename;
    slider.save((err, doc) => {
        if (!err){
            req.flash('success_msg', 'Save Successfully');
            res.redirect('/slider');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

// Edit
// router.post('/edit/:id', async (req, res) => {
//     const { id } = req.params;
//     const slider = await SliderModule.update({_id: id}, req.body);
//     req.flash('success_msg', 'Edit Successfully');
//     res.redirect('/slider');
//   });

router.post('/edit/:id', upload, async (req, res) => {
    const { id } = req.params;
    const dataread = await SliderModule.findById(id); 
    let filename = dataread.image;

    var slider = await SliderModule.findOneAndUpdate({_id: id});
    slider.fullName = req.body.fullName;
    slider.email = req.body.email;
    slider.mobile = req.body.mobile;
    slider.city = req.body.city;

    if(req.file!=null){
    deleteFile('./public/uploads/'+filename);
    slider.image = req.file.filename;
    } 
    
    slider.save((err, doc) => {
        if (!err){
            req.flash('success_msg', 'Save Successfully');
            res.redirect('/slider');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }
    });

  })

  
// Delect
  router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;

    const dataread = await SliderModule.findById(id); 
    console.log(dataread.image);
    let filename = dataread.image;
    deleteFile('./public/uploads/'+filename),
    await SliderModule.remove({_id: id}); 
    req.flash('error', 'Delect Successfully');
    res.redirect('/slider')
  })

  // Status
  router.get('/turn/:id', async (req, res) => {
    const {id} = req.params;
    const list = await SliderModule.findById(id); 
    list.status = !list.status;
    await list.save();
    if(!list.status){
        req.flash('error', 'InActive Successfully');
    } else {
        req.flash('success_msg', 'Active Successfully');
    }
    res.redirect('/slider')
  })



module.exports = router;
