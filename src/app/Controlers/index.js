const Swal = require('sweetalert2')

    Swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            Swal(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
            )
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })


console.log("hello");