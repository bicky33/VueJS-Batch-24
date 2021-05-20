export const login = {
    template:`<div>
                    <p>Siapakah anda gerangan?</p>
                    <select @change="onChange($event)">
                        <option disabled selected>Pilih gan</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
            </div>`,
    methods: {
        onChange(event){
            switch (event.target.value) {
                case 'user':
                    this.$router.push('user')
                    break;
                case 'admin': 
                    this.$router.push('admin')
                    break;
                default:
                    break;
            }
        }
    }
}